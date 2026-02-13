#!/usr/bin/env python3
import sys
from docx import Document

def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: extract_docx.py <input.docx> <output.txt>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    text = extract_text_from_docx(input_file)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"Extracted text from {input_file} to {output_file}")

