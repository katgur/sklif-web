import './Breadcrumbs.css'
import '../typography.css'

function Breadcrumbs({ title, children }) {
    return (
        <nav className="breadcrumbs">
            <h2 className='breadcrumbs__title font__inter--xl'>
                {title}
            </h2>
            <ul className='breadcrumbs__list font__inter--sm'>
                {
                    children.map && children.map((child, index) => {
                        return (
                            <li key={index} className='breadcrumbs__item'>
                                <span className={'breadcrumbs__link' + (index === children.length - 1 ? ' breadcrumbs__link--active' : '')}>
                                    {child}
                                </span>
                                {index < children.length - 1 && <span className='breadcrumbs__divider'>{`\u00A0\u00A0/\u00A0\u00A0`}</span>}
                            </li>
                        )
                    })
                }
                {
                    !children.map &&
                    <li className='breadcrumbs__item'>
                        <span className='breadcrumbs__link breadcrumbs__link--active'>
                            {children}
                        </span>
                    </li>
                }
            </ul>
        </nav >
    )
}

export default Breadcrumbs