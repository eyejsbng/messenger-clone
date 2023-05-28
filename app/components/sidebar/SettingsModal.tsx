"use client";

import { User } from "@prisma/client";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react"
import Input from '../inputs/Input'
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import Button from "../Button";
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}
const SettingsModal = ({isOpen, onClose, currentUser} : SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image
    }
  })

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/settings', data)
    .then(() => {
      toast.success('Profile updated successfully!')
      onClose();
      router.refresh();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
    
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Dialog.Title className="font-bold text-base">
        Profile
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <p>Edit your public information</p>
            <div className="mt-10 flex flex-col gap-y-7">
              <Input register={register} label="Name" id="name" required disabled={isLoading} errors={errors}/>
            </div>
            <div className="mt-10">
              <label className="block text-sm font-medium leading-6">Photo</label>
              <div className="mt-2 flex items-center gap-x-3">
                <Image  className="rounded-full" width="48" height="48" src={image || currentUser?.image || '/images/avatar_placeholder.png'} alt="Avatar"/>
                <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="cqjictbl">
                  <Button disabled={isLoading} secondary type="button">Change</Button>
                </CldUploadButton>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end">
            <Button type="button" disabled={isLoading} onClick={onClose} secondary>Cancel</Button>
            <Button type="submit" disabled={isLoading}>Submit</Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}  

export default SettingsModal;