import { MessageSquareReply } from "lucide-react";

type CommentData = {
  id: number,
  username: string,
  icon: string,
  relate?: string,
  relate_slug?: string,
  comment: string,
  date?: Date | Number,
  reply?: CommentData[],
  fromMe?: Boolean
}

type CardCommentProps = {
  data: CommentData,
  hiddentool?: Boolean,
  moderator?: Boolean,
  hasReply?: Boolean
}

export default function CardComment({ data, hiddentool = false, moderator = false, hasReply = false }: CardCommentProps) {
  return (
    <div className={"w-full flex p-4 border-gray-200 "+((data?.reply||[])[0]? "pt-3 pb-0":"px-3")+(hasReply? " border-t":" border-b")}>
      <div className="w-[40px] mt-1">
        <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
          <img
            src={data.icon || "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740"}
            alt={data.username || "Anonymous"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-[calc(100%-40px)] pl-1.5">
        {(data.relate && data.relate_slug)&&<div className="flex items-center mb-0.5 select-none">
          <MessageSquareReply size={17} className="text-gray-600 mr-1.5"/>
          <b className="text-sm font-bold text-gray-600">{`Recipe: ${data.relate}`}</b>  
        </div>}
        <small className="text-[0.9rem] font-bold">@{data.username || "unknown"}</small>
        <p>{data.comment || "..."}</p>
        {!hiddentool&&<div className="w-full flex mt-1.5">
          <button type="button" className="text-sm mr-3.5 text-gray-500 cursor-pointer">
            <span>Reply</span>
          </button>
          {data.fromMe&&<button type="button" className="text-sm mr-3.5 text-gray-500 cursor-pointer">
            <span>Edit</span>
          </button>}
          {(data.fromMe || moderator)&&<button type="button" className="text-sm text-red-500 cursor-pointer">
            <span>Delete</span>
          </button>}
        </div>}
        {(data.reply && data.reply.length > 0) && <div className="w-full mt-2.5">
          {data.reply.map((replyData, i) => (
            <CardComment key={i} data={replyData} moderator={moderator} hasReply={true}/>
          ))}
        </div>}
      </div>
    </div>
  );
}
