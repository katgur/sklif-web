import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import './Form.css';
import Button from "../Button";
import TwoColumnLayout from "./TwoColumnLayout";

function Form({ onSubmit, entity, children }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(entity);
    }, [entity]);

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { register, errors });
        }
        return child;
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="form card">
            {childrenWithProps}
            <div className="form__buttons">
                <Button type="reset" style="secondary">Сбросить</Button>
                <Button type="submit" style="primary">Готово</Button>
            </div>
        </form>
    )
}

export default Form;