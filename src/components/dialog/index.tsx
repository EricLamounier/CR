import './style.css'

import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { useState } from "react";

type InfoDialogType = {
  aprovacoes: number;
  reprovacoes: number;
  cr: string;
}
const InfoDialog = ({aprovacoes, reprovacoes, cr} : InfoDialogType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <InfoCircledIcon className="h-6 w-6 p-1/2 absolute right-1 top-1" />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
      <Transition show={isOpen} as="div">
        <Transition
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
            />
        </Transition>
        <Transition
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <DialogPrimitive.Content
            forceMount
            className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-md p-4 md:w-full",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "bg-zinc-50 dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
            >
              <DialogPrimitive.Title className="text-md font-medium text-gray-900 dark:text-gray-100">
                <p>Explicação do seu coeficiente</p>
              </DialogPrimitive.Title>

              <DialogPrimitive.Description asChild className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                <div>
                    <p>
                    O cálculo do coeficiente de rendimento do período é realizado da seguinte forma:
                    </p>
                    <p className="text-center">Resultado &#61; &sum;(NF &times; Créditos) &frasl; &sum;(Créditos)</p>
                    <ul className="mt-8 list-disc pl-5">
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
                </DialogPrimitive.Description>
    
              <div className="mt-4 flex justify-end">
                <DialogPrimitive.Close
                  className={clsx(
                    "flex select-none justify-center items-center rounded-md px-4 py-1 text-sm font-medium h-8",
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                    "border border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                >
                  <span>Fechar</span>
                </DialogPrimitive.Close>
              </div>

              <DialogPrimitive.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <Cross1Icon className="h-4 w-4 text-gray-700 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition>
        </Transition>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default InfoDialog;