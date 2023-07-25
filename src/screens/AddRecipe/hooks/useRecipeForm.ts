import { Ref, useEffect, useState } from "react";
import { IModalRef, IRecipeForm } from "../../../components/types";
import { initialRecipeForm } from "../../../constants/initialData";
import { pickImage, pickVideo } from "../../../utils/constants";
import { recipeService } from "../../../services/recipe/recipeService";

interface IUseRecipeForm {
    modalRef: any//Ref<IModalRef | null | undefined>;
    modalGalleryRef: any// Ref<IModalRef | null | undefined>;
}

interface IUseRecipeFormReturn {
    handleCoverImage: (type: string) => Promise<void>,
    form: IRecipeForm,
    setForm: React.Dispatch<React.SetStateAction<IRecipeForm>>,
    handleDirectionsVideo: (type: string) => Promise<void>;
    handleGalleryImages: (type: string) => Promise<void>;
    handleGalleryRemove: (index: number) => void;
    handleRemoveVideo: () => void,
    loading: boolean
}

const initialRecipeFiles = {
    coverImage: {},
    galleryImages: [],
    video: {}
}

export const useRecipeForm = (props: IUseRecipeForm): IUseRecipeFormReturn => {

    const { modalRef, modalGalleryRef } = props

    const [form, setForm] = useState<IRecipeForm>(JSON.parse(JSON.stringify(initialRecipeForm)));
    const [loading, setLoading] = useState<boolean>(false);

    const [formFiles, setFormFiles] = useState<IRecipeForm>(JSON.parse(JSON.stringify(initialRecipeFiles)));

    useEffect(() => {
        if (form.galleryImages.length == 0) return modalGalleryRef.current?.close()
    }, [form.galleryImages])

    const handleCoverImage = async (type: string) => {
        const result = await pickImage(type);

        if (!result) return;

        let newForm = { ...form }
        newForm.coverImage = result[0]

        setForm({ ...newForm })
        modalRef.current?.close()
    }

    const handleDirectionsVideo = async (type: string) => {
        const result = await pickVideo(type);

        if (!result) return;

        let newForm = { ...form }
        newForm.video = result[0]
        console.log(result[0])
        setForm({ ...newForm })
        modalRef.current?.close()
    }

    const handleRemoveVideo = () => {
        setForm({
            ...form,
            video: ''
        })
    }

    const handleGalleryImages = async (type: string) => {

        const result = await pickImage(type);
        const previousGalleryLength = form.galleryImages?.length

        if (previousGalleryLength >= 4) {
            alert('No more than 4 images');
            if (previousGalleryLength >= 1) return modalGalleryRef.current?.open()
        }

        if (!result) return;

        const totalImages = result.length + previousGalleryLength
        console.log(totalImages)

        let concactImages = form.galleryImages.concat(result).slice(0, 4)

        setForm({
            ...form,
            galleryImages: concactImages
        })

        modalRef.current?.close()
        if (previousGalleryLength >= 1) modalGalleryRef.current?.open()
    }

    const handleGalleryRemove = (index: number) => {
        setForm({
            ...form,
            galleryImages: form.galleryImages.filter(function (obj, i) { return i != index })
        })
    }

    const submitRecipeForm = async () => {
        setLoading(true)
        const params = {
            name: 'Matapa com caranguejo',
            ingredients: [
                'Tomate',
                'Cebola',
                '1kg Matapa',
                '2kg Caranguejo'
            ],
            coverImage: 'https://www.tvm.co.mz/images/358298.jpg'
        }
        const respnse = await recipeService.create(params)
        console.log('finised')
        setLoading(false)

    }

    return {
        handleCoverImage,
        form,
        setForm,
        handleDirectionsVideo,
        handleGalleryImages,
        handleGalleryRemove,
        handleRemoveVideo,
        loading,
        submitRecipeForm
    }
}