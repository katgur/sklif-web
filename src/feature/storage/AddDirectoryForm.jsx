import { useDispatch, useSelector } from 'react-redux';
import Form from '../../component/ui/Form';
import Input from '../../component/ui/Form/Input';
import { createDirectory, selectCurrent } from './storageSlice';

function AddDirectoryForm() {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(selectCurrent);

    const onSubmit = (data) => {
        dispatch(createDirectory({ path: currentDirectory + data.directoryName }))
    }

    const fields = [
        {
            name: "directoryName", text: "Название директории", type: "text", required: true
        }
    ]

    return (
        <Form onSubmit={onSubmit}>
            <Input field={fields[0]} />
        </Form>
    )
}

export default AddDirectoryForm;