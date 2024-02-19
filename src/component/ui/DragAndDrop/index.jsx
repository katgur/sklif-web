import { useEffect, useRef } from "react";
import './DragAndDrop.css';
import uploadIcon from './upload.svg';

function DragAndDrop({ setFiles, accepts }) {
    const dropAreaRef = useRef();

    useEffect(() => {
        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        function handleDrop(e) {
            setFiles(e.dataTransfer.files);
        }
        function handleDragEnter() {
            dropAreaRef.current.style.backgroundColor = "#3056d322"
        }
        function handleDragLeave() {
            dropAreaRef.current.style.backgroundColor = "#3056d311"
        }

        const dropArea = dropAreaRef.current;
        if (!dropArea) {
            return;
        }
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
        })
        dropArea.addEventListener('drop', handleDrop, false)
        dropArea.addEventListener('dragenter', handleDragEnter, false)
        dropArea.addEventListener('dragleave', handleDragLeave, false)

        return () => {
            if (!dropArea) {
                return;
            }
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.removeEventListener(eventName, preventDefaults, false)
            })
            dropArea.removeEventListener('drop', handleDrop, false)
            dropArea.removeEventListener('dragenter', handleDragEnter, false)
            dropArea.removeEventListener('dragleave', handleDragLeave, false)
        }
    }, [])

    return (
        <div className="card drag-and-drop">
            <label ref={dropAreaRef} className="drag-and-drop__area" htmlFor="file-upload">
                <span className="font__jost--sm font_color_text">
                    <span className="drag-and-drop__icon">
                        <img src={uploadIcon} alt="upload-icon" />
                    </span>
                    Нажмите для загрузки или перетащите файлы в формате <span className="font_color_primary">{accepts}</span>
                </span>
                <input id="file-upload" onChange={(e) => setFiles(e.target.files)} type="file" multiple />
            </label>
        </div>
    )
}

export default DragAndDrop