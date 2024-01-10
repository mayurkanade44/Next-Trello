"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

interface ListContainerProps {
  list: ListWithCards[];
  boardId: string;
}

const ListContainer = ({ list, boardId }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    setOrderedList(list);
  }, [list]);
  return (
    <ol className="flex gap-x-4 h-full">
      {orderedList.map((list, index) => {
        return <ListItem key={list.id} data={list} index={index} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
export default ListContainer;
