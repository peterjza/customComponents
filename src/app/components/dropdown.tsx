"use client";

import React, { useState, useEffect, useRef } from "react";

interface ItemProps {
  id: number;
  name: string;
}

interface DropdownProps {
  id: string;
  title: string;
  items: ItemProps[];
  selectedId?: number;
  onSelect?: (item: ItemProps) => ItemProps;
}

export const Dropdown = ({
  id,
  title,
  items,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemProps | undefined>(
    selectedId ? items.find((item) => item.id === selectedId) : undefined
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, setIsOpen]);

  const selectItem = (item: ItemProps) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect && onSelect(item);
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div ref={dropdownRef} className="flex flex-col w-full" id={id}>
      <div
        onClick={toggleIsOpen}
        className="flex justify-between items-center gap-5 py-2 px-4 bg-blue-500 text-white"
      >
        {selectedItem ? selectedItem.name : title}
      </div>
      {isOpen ? (
        <ul className=" bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block  w-full">
          {items.map((item) => (
            <li
              onClick={() => selectItem(item)}
              key={item.id}
              className="gap-5 py-2 px-4"
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
