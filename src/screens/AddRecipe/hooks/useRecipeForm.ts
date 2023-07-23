import { Ref, useEffect, useState } from "react";
import { IModalRef, IRecipeForm } from "../../../components/types";
import { initialRecipeForm } from "../../../constants/initialData";
import { pickImage, pickVideo } from "../../../utils/constants";

interface IUseRecipeForm {
    modalRef: any//Ref<IModalRef | null | undefined>;
    modalGalleryRef:any// Ref<IModalRef | null | undefined>;
}

export const useRecipeForm = (props: IUseRecipeForm) => {

    const { modalRef, modalGalleryRef } = props


    const [form, setForm] = useState<IRecipeForm>(JSON.parse(JSON.stringify(initialRecipeForm)));

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

    return {
        handleCoverImage,
        form,
        setForm,
        handleDirectionsVideo,
        handleGalleryImages,
        handleGalleryRemove
    }
}