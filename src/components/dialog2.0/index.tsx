import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Cross2Icon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';

type AlertType = {
    aprovacoes: number;
    reprovacoes: number;
    cr: string;
    open: boolean;
    setIsOpen: (opt: boolean) => void;
}

export default function InfoDialog20({ aprovacoes, reprovacoes, cr, open, setIsOpen }: AlertType) {

  const handleOnClose = () => {
    setIsOpen(false)
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
              <div className="bg-white pb-4 px-3 pt-5 6 dark:bg-gray-800 dark:text-white sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="sm:ml-4 sm:mt-0">
                    <div className='flex gap-4 items-center justify-center mb-2'>
                        <InfoCircledIcon aria-hidden="true" className="size-12 bg-amber-100 rounded-full p-2 text-yellow-600 shrink-0" />
                        <DialogTitle as="h3" className="text-base font-semibold">O cálculo do coeficiente de rendimento é realizado com a seguinte fórmula:</DialogTitle>
                    </div>
                    <div className='text-start'>
                        <p className="text-center">Resultado &#61; &sum;(NF &times; Créditos) &frasl; &sum;(Créditos)</p>
                        <ul className="mt-4 list-disc pl-5">
                            <li>
                                Caso o resultado seja <span className="font-black text-lg">&ge;</span> 60, seu coeficiente ficará <span className='bg-blue-300 px-1 dark:text-gray-800'>Azul</span>.
                            </li>
                            <li>
                                <p>Caso o resultado seja <span className="font-black text-lg">&lt;</span> 60:</p>
                                <ul className="list-disc pl-5">
                                    <li>
                                        Se o número de disciplinas aprovadas for <span className="font-black text-lg">&gt;</span> que o número de disciplinas reprovadas, seu coeficiente ficará <span className="bg-yellow-200 px-1 dark:text-gray-800">Amarelo</span>.
                                    </li>
                                    <li>
                                        Se o número de disciplinas aprovadas for <span className=" text-lg">&le;</span> que o número de disciplinas reprovadas, seu coeficiente ficará <span className="font-medium underline">Insuficiente</span> e <span className="bg-red-300 px-1 dark:text-gray-800">Vermelho</span>.
                                    </li>
                                </ul>
                            </li>
                            <li className='mt-1'>Lembrando que o cálculo do coeficiente não arredonda nenhum valor.</li>
                        </ul>
                        <p className='pt-4'>
                            Fonte: <a className='text-sky-400 underline' target='_blank' href="https://www.pre.ufv.br/regime-didatico/?chapters=avaliacoes-do-rendimento#coeficiente-de-rendimento">Regime Didático UFV</a>
                        </p>
                        <div className="h-[1px] my-4 w-full bg-zinc-500" />
                        <div>
                        {
                            (()=>{
                            if(Number(cr) >= 60){
                                return <p>Como seu resultado final do CR foi <span className="font-black text-lg">&ge;</span> 60, sua situação ficará <span className="font-medium underline">satisfatória</span> e seu coeficiente ficará <span className="bg-blue-300 px-1 dark:text-gray-800">Azul</span>.</p>
                            }else{
                                if(aprovacoes > reprovacoes){
                                return <p>Como seu resultado do CR foi <span className="font-black text-lg">&lt;</span> 60 e você passou na maioria das matérias, sua situação ficará <span className="font-medium underline">em atenção</span> e seu coeficiente ficará <span className="bg-yellow-200 px-1 dark:text-gray-800">Amarelo</span>.</p>
                                }else{
                                return <p>Como seu resultado do CR foi <span className="font-black text-lg">&lt;</span> 60 e você reprovou na maioria das matérias, sua situação ficará <span className="font-medium underline">insucifiente</span> e seu coeficiente ficará <span className="bg-red-300 px-1 dark:text-gray-800">Vermelho</span>.</p>
                                }
                            }
                            })()
                        }
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-3 py-2 flex justify-end gap-2 dark:bg-gray-900/95 sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={handleOnClose}
                  className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                >
                  Fechar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
}
