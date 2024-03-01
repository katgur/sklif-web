import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteFiles, selectCurrent, setCurrent } from "./storageSlice";
import { useState } from "react";
import useStorage from "../../hook/useStorage";
import { SortableTableViewer, ToolPanel } from "tailwind-admin";
import FolderIcon from '../../assets/folder.svg?react';
import FileIcon from '../../assets/file.svg?react';
import useApiDispatch from "../../hook/useApiDispatch.js";

const schema = ["Название", "Дата изменения", "Размер"];

const contextMenu = [
    (id) => { return <Link to={`/home/delete_file?id=${id}`}>Удалить</Link> }
]

const parseDate = (dateString) => {
    return new Date(Date.parse(dateString)).toLocaleString()
}

const isDirectory = (key) => {
    return key.slice(-1) === "/";
}

const getDirsInCurrentDirectory = (files, current) => {
    return files
        .filter(file => file.key.match(current) !== null)
        .filter(file => {
            const path = file.key.replace(current, "").split('/');
            return path.length === 2 && !path[1];
        })
}

const getFilesInCurrentDirectory = (files, current) => {
    return files
        .filter(file => file.key.match(current) !== null)
        .filter(file => {
            const path = file.key.replace(current, "").split('/');
            return path.length === 1 && path[0];
        })
}

const mapDirsForTable = (dirs, selected) => {
    return dirs.map(dir => {
        return {
            id: dir.key,
            isSelected: selected.has(dir.key),
            data: [
                <span key={dir.key}>
                    <FolderIcon />
                    <span>{dir.key.split('/').slice(-2)}</span>
                </span>,
                parseDate(dir.lastModified),
                "",
            ]
        }
    })
}

const mapFilesForTable = (files, selected) => {
    return files.map(file => {
        return {
            id: file.key,
            isSelected: selected.has(file.key),
            data: [
                <span key={file.key}>
                    <FileIcon />
                    <span>{file.key.split('/').slice(-1)}</span>
                </span>,
                parseDate(file.lastModified),
                `${Math.round(file.size / 1024)}KB`,
            ]
        }
    })
}

function FilesList() {
    const files = useStorage();
    const current = useSelector(selectCurrent);
    const dispatch = useApiDispatch();
    const [selected, setSelected] = useState(new Set());

    if (!files) {
        return;
    }

    const items = mapDirsForTable(getDirsInCurrentDirectory(files, current), selected)
        .concat(mapFilesForTable(getFilesInCurrentDirectory(files, current), selected));

    const onChooseFile = (key) => {
        if (selected.has(key)) {
            const newSet = new Set(selected);
            newSet.delete(key);
            setSelected(newSet);
        } else {
            setSelected(new Set(selected.add(key)));
        }
    }

    const onItemClick = (key) => {
        if (isDirectory(key)) {
            dispatch(setCurrent(key));
        }
    }

    const onBackButtonClick = () => {
        const path = current.split('/');
        path.splice(path.length - 2, 1);
        dispatch(setCurrent(path.join('/')));
    }

    const onDeleteButtonClick = () => {
        dispatch(deleteFiles(selected));
        setSelected(new Set());
    }

    const onRefreshButtonClick = () => {
        setSelected(new Set());
    }

    const storageToolPanelProps = {
        isEditMode: selected.size !== 0,
        current,
        onBackButtonClick,
        onDeleteButtonClick,
        onRefreshButtonClick,
    }

    return (
        <>
            <ToolPanel {...storageToolPanelProps}>
                <Link to='/home/add_directory'>Создать директорию</Link>
                <Link to='/home/add_file'>Загрузить файл</Link>
            </ToolPanel>
            <SortableTableViewer
                capacity={10}
                columns={schema}
                contextMenu={contextMenu}
                onItemClick={onChooseFile}
                onItemDoubleClick={onItemClick}
                items={items} />
        </>
    )
}

export default FilesList;