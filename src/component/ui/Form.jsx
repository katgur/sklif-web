import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const makePhoneNumberField = (field, register, error) => {
    var validation = {
        required: field.required && "Обязательное поле",
        pattern: {
            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            message: "Неверный формат данных"
        }
    }
    return <input key={field.text}
        {...register(field.name, validation)}
        type={field.type}
        placeholder={field.text}
        className={`${field.style}${error ? " error" : ""}`} />
}

const makeRadioField = (field, register, entity, error) => {
    var validation = {
        required: field.required
    }
    return (
        <>
            <h4>{field.text}</h4>
            {error && <span className="error-font">{error.message}</span>}
            {field.options.map((option, index) => {
                return (
                    <label className="radio" key={option}>
                        <input
                            {...register(field.name, validation)}
                            type='radio'
                            defaultChecked={entity ? entity[field.name] === option : index === 0}
                            className={field.style}
                            value={option} />
                        <span>{option}</span>
                    </label>
                )
            })}
        </>
    )
}

const makeSelectField = (field, register, error) => {
    var validation = {
        required: field.required && "Обязательное поле",
    }
    return (
        <>
            <h4>{field.text}</h4>
            {error && <span className="error-font">{error.message}</span>}
            <select
                key={field.name} {...register(field.name, validation)}>
                {field.options.map((option) => {
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                })}
            </select>
        </>
    )
}

const makeField = (field, register, error) => {
    var validation = {
        required: field.required && "Обязательное поле",
        pattern: {
            value: field.pattern,
            message: "Неверный формат данных"
        }
    }
    return <input key={field.name}
        {...register(field.name, validation)}
        type={field.type}
        placeholder={field.text}
        className={`${field.style}${error ? " error" : ""}`} />
}

/*
    fields:
    [
        {
            name: string,
            text: string,
            type: string,
            style: string,
            required: boolean,
            pattern: regex,
            options: [string],
        }
    ],
    submit: {
        text,
        style,
        action,
    },
    entity: {
        name: stirng,
        value: string,
    }
*/

const getFormField = (field, register, entity, errors) => {
    if (field.type === 'radio') {
        return makeRadioField(field, register, entity, errors[field.name]);
    } else if (field.type === 'phoneNumber') {
        return makePhoneNumberField(field, register, errors[field.name]);
    } else if (field.type === 'select') {
        return makeSelectField(field, register, errors[field.name]);
    } else {
        return makeField(field, register, errors[field.name]);
    }
}

function Form({ fields, submit, entity }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(entity);
    }, [reset, entity]);

    const onSubmit = (data) => {
        submit.action(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields &&
                fields.map((section) => {
                    return (
                        <div key={section.section}>
                            <p className="title-font">{section.section}</p>
                            {section.about && <p className="text-font">{section.about}</p>}
                            <div className="field-section" style={{gridTemplateColumns: '1fr '.repeat(section.columnNumber)}}>
                                {
                                    section.fields.map((field) => {
                                        return getFormField(field, register, entity, errors)
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            <div>
                <input type="submit" value={submit.text} className={submit.style} />
            </div>
        </form>
    )
}

export default Form;