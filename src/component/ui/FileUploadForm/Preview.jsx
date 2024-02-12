function Preview({ fileURL }) {
    return (fileURL &&
        <div>
            <img className="file-upload-form__preview-image" src={fileURL} alt="preview" />
        </div>
    )
}

export default Preview