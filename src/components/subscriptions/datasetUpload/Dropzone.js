// NOTE: NOT using for now. Code merged into UploadMultipleFiles.js

// import React from 'react';
// import Button from '~/core/ui/Button';

// export default function Basic(props) {
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

//   const files = acceptedFiles.map((file) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   return <div></div>;

//   return (
//     // <section className="container">
//     //   <div {...getRootProps({ className: 'dropzone' })}>
//     //     <input {...getInputProps()} />
//     //     <p>Drag 'n' drop some files here, or click to select files</p>
//     //   </div>
//     //   <aside>
//     //     <h4>Files</h4>
//     //     <ul>{files}</ul>
//     //   </aside>
//     // </section>

//     <div class="flex w-full items-center justify-center">
//       <label
//         for="dropzone-file"
//         class="dark:hover:bg-bray-800 flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//       >
//         <div class="flex flex-col items-center justify-center pb-6 pt-5">
//           <svg
//             aria-hidden="true"
//             class="mb-3 h-10 w-10 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//             ></path>
//           </svg>
//           <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
//             <span class="font-semibold">Click to upload</span> or drag and drop
//           </p>
//           <p class="text-xs text-gray-500 dark:text-gray-400">
//             PDF or TXT (Max 20 MB)
//           </p>
//         </div>
//         {/* <input id="dropzone-file" type="file" class="hidden" /> */}
//         <section className="container">
//           <div {...getRootProps({ className: 'dropzone' })}>
//             <input {...getInputProps()} />
//             {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
//           </div>
//           <aside>
//             {/* <h4>Files</h4> */}
//             <ul>{files}</ul>
//           </aside>
//         </section>
//       </label>
//     </div>
//   );
// }
