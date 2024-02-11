import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, selectCurrent, selectCurrentDirectories, selectCurrentFiles, setCurrent } from "./storageSlice";
import { useState } from "react";
import Modal from '../../component/ui/Modal';
import { isDirectory } from "../../util/storageUtil";
import { useRef } from "react";
import useStorage from "../../hook/useStorage";
import SortableTableViewer from "../../component/ui/SortableTableViewer";
import { folderIcon, fileIcon, backIcon, plusIcon, deleteIcon } from '../../res/svg';

const schema = ["Название", "Дата изменения", "Размер"];

const contextMenu = [
    (id) => { return <Link to={`/home/files/delete?id=${id}`}>Удалить</Link> }
]

function FilesList() {
    useStorage();

    const files = useSelector(selectCurrentFiles);
    const dirs = useSelector(selectCurrentDirectories);
    const current = useSelector(selectCurrent);
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState({ enabled: false });
    const [isEditMode, setEditMode] = useState(false);

    let items = dirs
        .map((dir) => {
            var date = new Date(Date.parse(dir.lastModified));
            return { id: dir.key, data: [<div className="text-with-svg"><span>{folderIcon}</span><span>{dir.key.split('/').slice(-2)}</span></div>, date.toLocaleDateString(), ""] }
        })

    items = items.concat(
        files
            .map((file) => {
                var name = (
                    <div className="text-with-svg">
                        {isEditMode && <span><input type="checkbox" className="checkbox" onChange={(e) => { onChooseFile(file.key, e.currentTarget.checked) }} /></span>}
                        <span>{fileIcon}</span>
                        <span>{file.key.split('/').slice(-1)}</span>
                    </div>
                )
                var date = new Date(Date.parse(file.lastModified));
                return { id: file.key, data: [name, date.toLocaleDateString(), `${Math.round(file.size / 1024)}KB`] }
            })
    )

    var selectedFiles = useRef([]);

    var onChooseFile = (key, isChecked) => {
        if (isChecked) {
            selectedFiles.current.push(key);
        } else {
            var index = selectedFiles.current.indexOf(key);
            selectedFiles.current.splice(index, 1);
        }
    }

    var onItemClick = (id) => {
        if (isDirectory(id)) {
            dispatch(setCurrent(id));
        }
    }

    var onBackButtonClick = () => {
        var path = current.split('/');
        path.splice(path.length - 2, 1);
        dispatch(setCurrent(path.join('/')));
    }

    var onPlusButtonClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        setModalState(
            {
                enabled: !modalState.enabled,
                coords: {
                    right: rect.width,
                    top: rect.y + window.scrollY + rect.height + 5,
                }
            }
        )
    }

    var onDeleteButtonClick = () => {
        if (selectedFiles.current.length !== 0) {
            dispatch(deleteFile({ fileNames: selectedFiles.current }));
            selectedFiles.current = [];
            setEditMode(false);
        }
    }

    var onToggleChange = () => {
        if (isEditMode) {
            selectedFiles.current = [];
        }
        setEditMode(!isEditMode);
    }

    return (
        <div className="content__home-page-table">
            {
                files.length !== 0 &&
                <div className="toggle-wrapper">
                    <label className="toggle">
                        <input type="checkbox" onChange={onToggleChange} />
                        <span className="slider"></span>
                    </label>
                    <span className="text-font">Редактирование</span>
                </div>
            }
            <div className="tools card">
                <div className="text-with-svg">
                    {current &&
                        <span onClick={onBackButtonClick} className="transparent-badge">{backIcon}</span>}
                    <span className="text-font accent">
                        {current}
                    </span>
                </div>
                <div className="right">
                    <div className="buttons">
                        <span onClick={onPlusButtonClick} className="transparent-badge">
                            {plusIcon}
                        </span>
                        {
                            isEditMode &&
                            <span onClick={onDeleteButtonClick} className="transparent-badge">
                                {deleteIcon}
                            </span>
                        }
                    </div>
                </div>
                <Modal state={modalState}>
                    <ul className="list-context-menu">
                        <li>
                            <Link to='/home/add_directory'>Создать директорию</Link>
                        </li>
                        <li>
                            <Link to='/home/add_file'>Загрузить файл</Link>
                        </li>
                    </ul>
                </Modal>
            </div>
            {
                items.length !== 0 &&
                <SortableTableViewer
                    onItemClick={onItemClick}
                    capacity={5}
                    columns={schema}
                    contextMenu={contextMenu}
                    items={items} />
            }
            <Outlet />
        </div>
    )
}

export default FilesList;