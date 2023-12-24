import { useDispatch, useSelector } from 'react-redux';
import Form from '../../component/ui/Form.jsx';
import { addDirectory, selectCurrent } from './storageSlice';

function AddDirectoryForm() {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(selectCurrent);

    var submitAction = (data) => {
        dispatch(addDirectory({ path: currentDirectory + data.directoryName }))
    }
    
    var fields = [
        {
            section: "Введите назание новой директории, которая будет создана в директории " + currentDirectory,
            fields: [
                {
                    name: "directoryName", text: "Название директории", style: "outline-input", type: "text", required: true
                }
            ]
        }
    ]

    var submit = {
        text: "Создать", style: "filled-button", action: submitAction
    }

    return (
        <div className="content__home-page-form">
            <div className="card">
                <Form fields={fields} submit={submit} />
            </div>
        </div>
    )
}

export default AddDirectoryForm;