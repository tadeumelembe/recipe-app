import { useState } from "react";
import { Control, UseFormHandleSubmit, UseFormWatch, useForm } from "react-hook-form";
import { authService } from "../services/auth/authService";
import { useAuth } from "../contexts/authContext";

interface IFormData {
    name: string;
    password: string;
    password2: string;
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
    const { signIn } = useAuth()
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

        await authService.create(data).then(authUser => {
            // Replaces the nameless user the auth listener stored on sign-up.
            signIn(authUser)
        }).catch(error => {

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