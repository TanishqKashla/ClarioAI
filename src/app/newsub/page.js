// "use client"
// import {
//     useState
// } from "react"
// import {
//     toast
// } from "sonner"
// import {
//     useForm
// } from "react-hook-form"
// import {
//     zodResolver
// } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import {
//     cn
// } from "@/lib/utils"
// import {
//     Button
// } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import {
//     Input
// } from "@/components/ui/input"

// const formSchema = z.object({
//     subject: z.string().min(1),
//     topic: z.string().min(1)
// });

// export default function MyForm() {
//     const [subtopics, setSubtopics] = useState(['', '']);
//     const [isBulkMode, setIsBulkMode] = useState(false);
//     const [bulkSubtopics, setBulkSubtopics] = useState('');

//     const form = useForm({
//         resolver: zodResolver(formSchema),

//     })

//     function onSubmit(values) {
//         try {
//             console.log(values);
//             toast(
//                 <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                     <code className="text-white">{JSON.stringify(values, null, 2)}</code>
//                 </pre>
//             );
//         } catch (error) {
//             console.error("Form submission error", error);
//             toast.error("Failed to submit the form. Please try again.");
//         }
//     }


//     const handleAddSubtopic = () => {
//         setSubtopics([...subtopics, '']);
//     };

//     const handleDeleteSubtopic = (indexToDelete) => {
//         // Don't allow deleting if there's only one subtopic field
//         if (subtopics.length <= 1) {
//             return;
//         }

//         const newSubtopics = subtopics.filter((_, index) => index !== indexToDelete);
//         setSubtopics(newSubtopics);
//     };

//     const handleSubtopicChange = (index, value) => {
//         const newSubtopics = [...subtopics];
//         newSubtopics[index] = value;
//         setSubtopics(newSubtopics);
//     };

//     const handleToggleMode = () => {
//         if (isBulkMode) {
//             // Switching from bulk to individual mode
//             // Reset the individual inputs instead of converting
//             setSubtopics(['', '']);
//         } else {
//             // Switching from individual to bulk mode
//             // Convert individual subtopics to bulk text
//             const validSubtopics = subtopics.filter(st => st.trim());
//             setBulkSubtopics(validSubtopics.join('\n'));
//         }

//         setIsBulkMode(!isBulkMode);
//     };

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

//                 <FormField
//                     control={form.control}
//                     name="subject"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Enter Subject Name*</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Physics"

//                                     type=""
//                                     {...field} />
//                             </FormControl>
//                             <FormDescription>This is your Subject</FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="topic"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Enter Topic Name*</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Kinematics"

//                                     type="text"
//                                     {...field} />
//                             </FormControl>
//                             <FormDescription>This is your topic</FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="subtopic"
//                     render={({ field }) => (
//                         <FormItem>
//                             <div className="flex justify-between items-center mb-2">
//                                 <FormLabel>Enter SubTopic Name (if any)</FormLabel>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-sm text-muted-foreground">
//                                         {isBulkMode ? 'Bulk Mode' : 'Individual Mode'}
//                                     </span>
//                                     <button
//                                         type="button"
//                                         onClick={handleToggleMode}
//                                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBulkMode ? 'bg-primary' : 'bg-muted'
//                                             }`}
//                                     >
//                                         <span
//                                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBulkMode ? 'translate-x-6' : 'translate-x-1'
//                                                 }`}
//                                         />
//                                     </button>
//                                 </div>
//                             </div>

//                             <FormControl>
//                                 {isBulkMode ? (
//                                     <textarea
//                                         placeholder="Paste your syllabus content here"
//                                         value={bulkSubtopics}
//                                         onChange={(e) => setBulkSubtopics(e.target.value)}
//                                         className="input w-full min-h-[120px]"
//                                         rows={5}
//                                     />
//                                 ) : (
//                                     <>
//                                         {subtopics.map((subtopic, index) => (
//                                             <div key={index} className="mb-2 flex items-center gap-2">
//                                                 <input
//                                                     type="text"
//                                                     placeholder={`Enter SubTopic ${index + 1}`}
//                                                     value={subtopic}
//                                                     onChange={(e) => handleSubtopicChange(index, e.target.value)}
//                                                     className="input w-full"
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleDeleteSubtopic(index)}
//                                                     className="bg-warning-faded text-warning hover:bg-warning/20 rounded-md w-8 h-8 flex items-center justify-center"
//                                                     disabled={subtopics.length <= 1}
//                                                     title="Delete subtopic"
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         ))}
//                                         <div className="flex justify-center mt-2">
//                                             <button
//                                                 onClick={handleAddSubtopic}
//                                                 className="bg-muted text-primary hover:bg-muted-foreground/10 rounded-md w-10 h-10 flex items-center justify-center"
//                                                 type="button"
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                     </>
//                                 )}
//                             </FormControl>

//                             <FormDescription>
//                                 {isBulkMode ? 'Paste full content in bulk' : 'You can add and manage subtopics individually'}
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     )
// }