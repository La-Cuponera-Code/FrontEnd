/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon
} from "@heroicons/react/20/solid";
//import { getVendedores } from '../services/vendedoresService'; // Import your service to get vendors
//import ListaVendedores from "./Vendedor/ListaVendedores"; // Adjust the import path as needed

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


export default function Example({ title, children, onFilterChange, onSortChange, type }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    //const { t } = useTranslation();

    const sortOptions = [
        { name: "Mas Populares"/*t('most_popular')*/, href: "#", current: true },
        { name: "Mejor Puntuados"/*t('best_rated')*/, href: "#", current: false },
        { name: "Mas recientes"/*t('most_recent')*/, href: "#", current: false },
        { name: "Precio: menor a mayor"/*t('price_low_to_high')*/, href: "#", current: false },
        { name: "Precio: mayor a menor"/*t('price_hight_to_low')*/, href: "#", current: false }
    ];
    const sortOptionsStores = [
        { name: "Mas Populares"/*t('most_popular')*/, href: "#", current: true },
        { name: "Mejor Puntuados"/*t('best_rated')*/, href: "#", current: false },
        { name: "Mas recientes"/*t('most_recent')*/, href: "#", current: false },
    ];
    const filters = [
        {
            id: "category",
            name: "Categorias",
            options: [
                { value: "parati", label: "Para ti"/*t('for_you')*/, checked: false },
                { value: "paratubienestar", label: "Para tu bienestar"/*t('for_your_wellbeing')*/, checked: false },
                { value: "paratuhogar", label: "Para tu hogar"/*t('for_your_home')*/, checked: false },
                { value: "paradisfrutar", label: "Para disfrutar"/*t('to_enjoy')*/, checked: false },
                { value: "paratumente", label: "Para tu mente"/*t('for_your_mind')*/, checked: false },
                { value: "paraquienamas", label: "Para quien amas"/*t('for_who_you_love')*/, checked: false },
                { value: "paratumesa", label: "Para tu mesa"/*t('for_your_table')*/, checked: false },
                { value: "paratupaladar", label: "Para tu paladar"/*t('for_your_palate')*/, checked: false },
                { value: "paralospeludos", label: "Para los peludos"/*t('pets')*/, checked: false },
                { value: "tecnologia", label: "Tecnología"/*t('technology')*/, checked: false },
                { value: "servicos", label: "Servicios Profesionales"/*t('services')*/, checked: false },
                { value: "inmobiliaria", label: "Inmobiliaria & Automotriz"/*t('real_estate')*/, checked: false },
                { value: "gobernantes", label: "Para los gobernantes"/*t('rulers')*/, checked: false },
                { value: "reciclaygana", label: "Reciclá & Ganá"/*t('recycle_and_earn')*/, checked: false },
            ],
        },
    ];

    const handleFilterChange = (sectionId, value) => {
        onFilterChange(sectionId, value)
    };

    const handleSortClick = (sortOption) => {
        onSortChange(sortOption);
    };

    const handleSortClickStore = (sortOptionsStores) => {
        onSortChange(sortOptionsStores);
    };

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition show={mobileFiltersOpen}>
                    <Dialog
                        className="relative z-5000 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <TransitionChild
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </TransitionChild>

                        <div className="fixed inset-0 z-40 flex">
                            <TransitionChild
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                        Filtros{/*t('filters')*/}
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Cerrar menú{/*t('close_menu')*/}</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories{/*t('categories')*/}</h3>
                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {section.name}
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </DisclosureButton>
                                                        </h3>
                                                        <DisclosurePanel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={option.value}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            onChange={() => handleFilterChange(section.id, option.label)}
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </DisclosurePanel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-0">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            {title}
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Ordenar por:{/*t('sort_by')*/}
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </MenuButton>
                                </div>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {type === 'cupones' ? (
                                                sortOptions.map((option) => (
                                                    <MenuItem key={option.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                onClick={() => handleSortClick(option.name)}
                                                                className={classNames(
                                                                    option.current
                                                                        ? "font-medium text-gray-900"
                                                                        : "text-gray-500",
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm"
                                                                )}
                                                            >
                                                                {option.name}
                                                            </Link>
                                                        )}
                                                    </MenuItem>
                                                ))
                                            ):(
                                                sortOptionsStores.map((option) => (
                                                    <MenuItem key={option.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                onClick={() => handleSortClickStore(option.name)}
                                                                className={classNames(
                                                                    option.current
                                                                        ? "font-medium text-gray-900"
                                                                        : "text-gray-500",
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm"
                                                                )}
                                                            >
                                                                {option.name}
                                                            </Link>
                                                        )}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filtros{/*t('filters')*/}</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Productos{/*t('products')*/}
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
                            {/* Filters */}
                            <form className="hidden lg:block col-span-1">
                                <h3 className="sr-only">Categorías{/*t('categories')*/}</h3>
                                {filters.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    onChange={() => handleFilterChange(section.id, option.label)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="col-span-1 lg:col-span-4">{children}</div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
