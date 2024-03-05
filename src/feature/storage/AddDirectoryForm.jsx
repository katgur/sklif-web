import { useSelector } from 'react-redux';
import { Form, Input, Card } from 'tailwind-admin';
import { createDirectory, selectCurrent } from './storageSlice';
import useApiDispatch from "../../hook/useApiDispatch.js";

const fields = [
    {
        name: "directoryName", text: "Название директории", type: "text", required: true
    }
]

function AddDirectoryForm() {
    const dispatch = useApiDispatch();
    const currentDirectory = useSelector(selectCurrent);

    const onSubmit = (data) => {
        dispatch(createDirectory(currentDirectory, data.directoryName))
    }

    return (
        <Card width="full">
            <Form onSubmit={onSubmit}>
                <Input field={fields[0]} />
            </Form>
        </Card>
    )
}

export default AddDirectoryForm;