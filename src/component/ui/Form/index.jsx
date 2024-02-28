import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from './style.module.css'
import Button from "../Button";

function Form({ title, onSubmit, onCancel, entity, children }) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [dependencies, setDependencies] = useState();

    useEffect(() => {
        reset(entity);
    }, [entity]);

    useEffect(() => {
        React.Children.map(children, child => {
            const newDependencies = {};
            if (React.isValidElement(child) && child.props?.field?.dependsOn) {
                newDependencies[child.props.field.name] = child.props.field.dependsOn;
            }
            setDependencies(newDependencies);
        });
    }, []);
 
    if (!dependencies) {
        return;
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            if (child.props?.field?.dependsOn && !watch(dependencies[child.props.field.name])) {
                return;
            }
            return React.cloneElement(child, { register, entity, errors });
        }
        return child;
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} onReset={onCancel} className={style.form}>
            {
                title && <h2 className={`${style.title} font__inter--m`}>{title}</h2>
            }
            {childrenWithProps}
            <div className={`${style.buttons} ${style[(title ? "center" : "left")]}`}>
                <Button type="submit" style="primary">Готово</Button>
                <Button type="reset" style="secondary">Отмена</Button>
            </div>
        </form>
    )
}

export default Form;