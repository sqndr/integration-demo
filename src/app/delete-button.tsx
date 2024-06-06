"use client";

import { api } from "~/trpc/react";
import { DeleteIcon, Icon } from "./_components/icon";

export const DeleteButton = ({ id }: { id: number }) => {
  const utils = api.useUtils();
  const deleteMutation = api.post.deleteById.useMutation();

  const handleSubmit = () => {
    deleteMutation.mutate(id, {
      async onSuccess() {
        await utils.post.invalidate();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button aria-label="Delete this item" className="text-red-400">
        <Icon>
          <DeleteIcon />
        </Icon>
      </button>
    </form>
  );
};
