import { useState } from 'react';

const DomainsField: React.FCC<{
  domains?: any;
  setDomains?: (value: any) => unknown;
  removeDomain?: (id: string) => void;
}> = ({ domains, setDomains, removeDomain }) => {
  const [domainField, setDomainField] = useState('');

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="flex h-[60px] flex-wrap items-center overflow-y-auto rounded-lg border !border-b !border-gray_bg-1 py-2 pl-5 pr-3 font-Outfit text-lg placeholder:text-gray_text-0 focus:border-gray_bg-2 focus:ring-gray_bg-2 dark:focus:border-gray_bg-2 dark:focus:ring-gray_bg-2">
      {domains?.map((domain: any) => (
        <div
          key={domain?.id}
          className="mb-2 mr-2 flex h-[30px] bg-gray_bg-1 px-2 text-base font-light text-gray_text-1"
        >
          <span className="my-0.5 text-base font-light">{domain?.domain}</span>
          <span
            className="my-auto ml-2.5 cursor-pointer"
            onClick={() => {
              removeDomain(domain?.id);
            }}
          >
            {closeIcon}
          </span>
        </div>
      ))}
      <input
        type="text"
        className="mb-2 mr-2 h-full bg-transparent outline-0 "
        onChange={(e) => {
          let v = e.target.value;
          setDomainField(v);
        }}
        value={domainField}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (domainField !== '') {
              setDomains(domainField);
              setDomainField('');
            }
          }
          // e.target.scrollIntoView();
        }}
      />
    </div>
  );
};

export default DomainsField;
