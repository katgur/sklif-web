import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import './Form.css';
import Button from "../Button";

function Form({ onSubmit, onCancel, entity, children }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(entity);
    }, [entity]);

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { register, entity, errors });
        }
        return child;
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} onReset={onCancel} className="form card">
            {childrenWithProps}
            <div className="form__buttons">
                <Button type="submit" style="primary">Готово</Button>
                <Button type="reset" style="secondary">Сбросить</Button>
            </div>
        </form>
    )
}

export default Form;