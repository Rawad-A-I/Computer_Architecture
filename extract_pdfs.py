import os
from pathlib import Path
from urllib.parse import quote
try:
    import fitz  # PyMuPDF
except ImportError:
    print("Error: PyMuPDF (fitz) is not installed. Please install it with: pip install pymupdf")
    exit(1)

def extract_text_and_images_from_pdf(pdf_path, output_dir):
    """Extract text content and images from a PDF file, preserving their positions."""
    page_contents = []
    images_dir = output_dir / f"{pdf_path.stem}_images"
    images_dir.mkdir(exist_ok=True)
    
    try:
        doc = fitz.open(pdf_path)
        num_pages = len(doc)
        
        for page_num in range(num_pages):
            page = doc[page_num]
            page_elements = []
            
            # Extract text blocks with their positions
            text_dict = page.get_text("dict")
            for block in text_dict.get("blocks", []):
                if "lines" in block:  # Text block
                    block_text = ""
                    for line in block["lines"]:
                        for span in line["spans"]:
                            block_text += span["text"]
                        block_text += "\n"
                    
                    if block_text.strip():
                        # Use the top-left corner (y-coordinate) for positioning
                        bbox = block["bbox"]
                        page_elements.append({
                            "type": "text",
                            "y": bbox[1],  # Top y-coordinate
                            "content": block_text.strip()
                        })
            
            # Extract images with their positions
            image_list = page.get_images()
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Get image position on page
                image_rects = page.get_image_rects(xref)
                if image_rects:
                    # Use the first rectangle's top y-coordinate
                    img_rect = image_rects[0]
                    img_y = img_rect.y0
                else:
                    # Fallback: use a high y-value to place at end
                    img_y = 99999
                
                # Save image
                image_filename = f"page_{page_num + 1}_img_{img_index + 1}.{image_ext}"
                image_path = images_dir / image_filename
                
                with open(image_path, "wb") as img_file:
                    img_file.write(image_bytes)
                
                # Add image reference - use relative path from markdown file location
                # Both markdown and images folder are in the same directory (lectures_dir)
                images_folder_name = f"{pdf_path.stem}_images"
                # Use forward slashes for cross-platform compatibility
                relative_image_path = f"./{images_folder_name}/{image_filename}"
                # URL-encode the path for HTML img tag to handle special characters
                encoded_path = quote(relative_image_path, safe="/")
                # Use HTML img tag for better compatibility with special characters in paths
                page_elements.append({
                    "type": "image",
                    "y": img_y,
                    "content": f'<img src="{encoded_path}" alt="Image {img_index + 1} from page {page_num + 1}" />'
                })
            
            # Sort elements by vertical position (top to bottom)
            page_elements.sort(key=lambda x: x["y"])
            
            # Build page content
            page_content = f"## Page {page_num + 1}\n\n"
            for element in page_elements:
                page_content += element["content"] + "\n\n"
            
            page_contents.append(page_content)
        
        doc.close()
    
    except Exception as e:
        print(f"Error processing {pdf_path}: {str(e)}")
        import traceback
        traceback.print_exc()
        return None
    
    return "\n".join(page_contents)

def main():
    # Get the Lectures directory
    lectures_dir = Path("Lectures")
    
    if not lectures_dir.exists():
        print(f"Error: {lectures_dir} directory not found!")
        return
    
    # Find all PDF files
    pdf_files = list(lectures_dir.glob("*.pdf"))
    
    if not pdf_files:
        print("No PDF files found in Lectures directory!")
        return
    
    print(f"Found {len(pdf_files)} PDF file(s) to process...\n")
    
    # Process each PDF
    for pdf_path in pdf_files:
        print(f"Processing: {pdf_path.name}")
        
        # Extract text and images
        text_content = extract_text_and_images_from_pdf(pdf_path, lectures_dir)
        
        if text_content:
            # Create markdown filename
            md_filename = pdf_path.stem + ".md"
            md_path = lectures_dir / md_filename
            
            # Write to markdown file
            with open(md_path, 'w', encoding='utf-8') as md_file:
                md_file.write(f"# {pdf_path.stem}\n\n")
                md_file.write(text_content)
            
            print(f"  ✓ Created: {md_path}")
        else:
            print(f"  ✗ Failed to extract content from {pdf_path.name}")
    
    print("\nDone!")

if __name__ == "__main__":
    main()

