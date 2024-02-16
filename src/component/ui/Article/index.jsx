import './Article.css';

function Article({ title, children }) {
    return (
        <article>
            <h1 className="font__inter--m">
                {title}
            </h1>
            <p className="article__text font__inter--sm font_color_text">
                {children}
            </p>
        </article>
    )
}

export default Article