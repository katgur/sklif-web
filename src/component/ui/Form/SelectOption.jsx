function SelectOption({ children }) {
    return (
        <option className="font__regular-16 font_color_text form__field" value={children}>{children}</option>
    )
}

export default SelectOption