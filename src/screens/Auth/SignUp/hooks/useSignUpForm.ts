import { useState } from "react";
import { Control, UseFormHandleSubmit, UseFormWatch, useForm } from "react-hook-form";
import { authService } from "../../../../services/auth/authService";

interface IFormData {
    name: string;
    password: string;
    email: string
}

interface IUseSignUpForm {
    formData: IFormData
}

interface IUseSignUpFormReturn {
    submitForm: (data: IFormData) => Promise<void>,
    watch: UseFormWatch<IFormData>,
    handleSubmit: UseFormHandleSubmit<IFormData>;
    control: Control<IFormData>;
    loading: boolean;
    formError: string
}

export function useSignUpForm(): IUseSignUpFormReturn {
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const { control, handleSubmit, watch } = useForm<IFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const submitForm = async (data: IFormData) => {
        const { email, password, name } = data
        setFormError('')
        setLoading(true)

        await authService.create(data).catch(error => {

            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false)

            setFormError('Something went wrong')

        })

    }

    return {
        submitForm,
        watch,
        handleSubmit,
        control,
        loading,
        formError,
    }
}