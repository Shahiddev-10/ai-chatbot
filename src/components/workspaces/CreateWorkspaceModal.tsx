import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import Textarea from '~/core/ui/Textarea';
import Button from '~/core/ui/Button';
import useCreateWorkspace from '~/lib/workspaces/hooks/use-create-workspace';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

function CreateWorkspaceModal(
  props: React.PropsWithChildren<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }>
) {
  const { isOpen, setIsOpen } = props;

  // TODO later: validate the workspacename for non alphanumeric chars
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createWorkspace = useCreateWorkspace();
  const { trigger, isMutating } = createWorkspace;

  // this is how to create a new workspace
  const onCreateWorkspace = useCallback(
    async (data, event) => {
      // event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      // console.log('🚀 ~ file: CreateWorkspaceModal.tsx:23 ~ name:', name);

      if (isMutating) {
        return;
      }

      const workspaceData = { name: name.trim(), description };
      await trigger(workspaceData);
      setIsOpen(false);
    },
    [trigger, isMutating]
  );

  return (
    <Modal
      heading={`Creating Workspace`}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
    >
      <form onSubmit={handleSubmit(onCreateWorkspace)}>
        <div className={'flex flex-col space-y-4'}>
          <TextField.Label>
            Workspace Name
            <TextField.Input
              name={'name'}
              placeholder={'Workspace name'}
              id="workspaceName"
              {...register('name', {
                validate: (value) => {
                  return !!value.trim();
                },
              })}
            />
            {errors.name && (
              <TextField.Error
                error={`Please ensure that the workspace name is not empty`}
              />
            )}
          </TextField.Label>
          <TextField.Label>
            Description
            <Textarea
              cols="2"
              name={'description'}
              placeholder={'Workspace description'}
              id="workspaceDescription"
              {...register('description', {
                validate: (value) => {
                  return !!value.trim();
                },
              })}
            />
            {errors.name && (
              <TextField.Error
                error={`Please ensure that the workspace description is not empty`}
              />
            )}
          </TextField.Label>

          <div className={'flex justify-end space-x-2.5'}>
            <Modal.CancelButton onClick={() => props.setIsOpen(false)} />

            <Button variant={'flat'}>Create Workspace</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CreateWorkspaceModal;
