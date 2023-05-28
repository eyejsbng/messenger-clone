"use client";

import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import { User } from "@prisma/client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog } from '@headlessui/react';
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";
interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[]
}
const GroupChatModal = ({isOpen, onClose, users}: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState:{errors}} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    }
  })

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
       <form onSubmit={handleSubmit(onSubmit)}>
         <div className="space-y-8">
          <div className="border-b border-gray-800/10 pb-5">
            <h1 className="font-bold">Create a group chat</h1>
            <p className="text-gray-600">Create a chat with more than 2 people</p>
          </div>
          <div className="mt-10 flex flex-col gap-y-7">
            <Input register={register} label="Name" id="name" disabled={isLoading} required errors={errors}/>
            <Select disabled={isLoading} label="Members" 
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id
                }))}
                onChange={(value) => setValue('members', value, {
                  shouldValidate: true
                })}
                value={members}
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={onClose} disabled={isLoading} secondary>Cancel</Button>
            <Button disabled={isLoading} type="submit">Create</Button>
          </div>
         </div>
        </form>
    </Modal>
  )
}

export default GroupChatModal;