import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Cross2Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons'

type AlertType = {
  open: boolean;
  setAlertChoice: (opt: number) => void;
  setIsOpen: (opt: boolean) => void;
}

export default function Alert({ open, setAlertChoice, setIsOpen }: AlertType) {
  const handleChoice = (opt: number) => {
    setAlertChoice(opt)
    setIsOpen(false)
  }

  const handleOnClose = () => {
    setIsOpen(false)
    setAlertChoice(0)
  }

  return (
    <Dialog open={open} onClose={handleOnClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="min-h-8 relative bg-gray-50 px-3 py-2 flex gap-2 dark:bg-gray-900/95 sm:px-6">
              <button onClick={handleOnClose} className='h-full p-1 absolute top-0 right-2 dark:text-white'>
                  <Cross2Icon className='w-auto h-full' />
              </button>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 dark:bg-gray-800 dark:text-white sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold">
                    Você está prestes a limpar todos os dados!
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm">
                      Você tem certeza que quer limpar todas as informações inseridas?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/95 px-3 py-2 flex justify-end gap-2 sm:px-6">
              <button
                type="button"
                onClick={() => handleChoice(1)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
              >
                Limpar
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => handleChoice(0)}
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
