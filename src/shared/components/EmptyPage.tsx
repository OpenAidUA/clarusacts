import React from 'react';

type EmptyPagePlaceholderProps = {
  icon: React.JSX.Element;
  title: string;
  descr: string;
  children: React.JSX.Element;
};

const EmptyPagePlaceholder: React.FC<EmptyPagePlaceholderProps> = ({
  icon,
  title,
  descr,
  children,
}) => {
  return (
    <div className="h-full bg-primary-foreground shadow-sm border border-dashed border-gray-200 flex items-center justify-center rounded-xl">
      <div className="max-w-2xl w-full p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-muted text-blue-600 mb-6">
          {icon}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>

        <p className="text-gray-500 mb-8 max-w-sm mx-auto">{descr}</p>

        {children}

        {/* Кнопка действия */}
        {/* <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors gap-2 shadow-sm">
          <PlusIcon className="w-5 h-5" />
          Create my first act
        </button> */}
      </div>
    </div>
  );
};

export default EmptyPagePlaceholder;
