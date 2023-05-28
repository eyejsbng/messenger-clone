"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPhoto, HiPaperAirplane  } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import {BsEmojiSmile} from 'react-icons/bs'

const Form = () => {
  const { conversationId } = useConversation();
  const [isSending, setIsSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const {register, handleSubmit, setValue, formState: {errors}, getValues} = useForm<FieldValues>({
    defaultValues: {
      message: '',
    }
  });

  const emojiClick = (emojiData : EmojiClickData, event: MouseEvent) => {
    const prev = getValues("message");
    setValue('message', prev + emojiData.emoji)
    console.log(prev);
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsSending(true);
    setValue('message', '', { shouldValidate: true});
    axios.post('/api/messages', {
      ...data, 
      conversationId
    }).then(() => {}).finally(() => setIsSending(false))
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }
  return ( 
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="cqjictbl">
        <HiPhoto className="text-sky-500 hover:text-sky-400 tansition" size={30}/>
      </CldUploadButton>
      <span className="select-none press text-2xl cursor-pointer text-sky-500 hover:text-sky-300 hover:scale-110 transition focus:outline-none" onClick={() => setShowEmoji(prevState => !prevState)}>🙂</span>
      <div className={`transition absolute bottom-20 ${showEmoji ? 'block' : 'hidden'}`}>
        <EmojiPicker onEmojiClick={emojiClick} autoFocusSearch={false} emojiStyle={EmojiStyle.FACEBOOK}/> 
      </div>
      <fieldset className="w-full" disabled={isSending}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
          <MessageInput id="messsage" register={register} errors={errors} required placeholder="Write a message."/>
          <button type="submit">
          <HiPaperAirplane size={30} className="text-sky-500 hover:text-sky-300"/>
        </button>
        </form>
      </fieldset>
    </div>
  )
}

export default Form;