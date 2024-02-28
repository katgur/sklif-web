import Card from '../Card';
import style from './style.module.css'
import DesignIcon from './design.svg?react';
import DocsIcon from './docs.svg?react';
import ImageIcon from './image.svg?react';
import MusicIcon from './music.svg?react';

const icons = {
    design: <DesignIcon />,
    docs: <DocsIcon />,
    image: <ImageIcon />,
    music: <MusicIcon />,
}

const data = [
    {
        name: "design",
        memory: 459,
        count: 17,
        color: "purple",
    },
    {
        name: "image",
        memory: 120,
        count: 12,
        color: "dark-green",
    },
    {
        name: "music",
        memory: 374,
        count: 39,
        color: "blue",
    },
    {
        name: "docs",
        memory: 237,
        count: 78,
        color: "dark-yellow",
    },
]

function FileStatistics() {
    return (
        <ul className={style.wrapper}>
            {
                data.map(item => (
                    <li key={item.name} className={style.item}>
                        <Card padding="m">
                            <div className={style.content}>
                                <span className={`${style.icon} font_color_${item.color}`}>
                                    {icons[item.name]}
                                </span>
                                <div>
                                    <p className={`font__jost--sm ${style.text} font_color_${item.color}`}>
                                        {item.name}
                                    </p>
                                    <p className={style.text}>
                                        {item.count} files
                                    </p>
                                </div>
                                <span className={style.memory}>
                                    {item.memory} MB
                                </span>
                            </div>
                        </Card>
                    </li>
                ))
            }
        </ul>
    )
}

export default FileStatistics;