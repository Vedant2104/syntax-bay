import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import {create} from 'zustand'
// import { Monaco  } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";
import type * as monaco from 'monaco-editor'

const getInitialState = () =>{
    //doing this when in server
    if(typeof window == "undefined"){
        return{
            language : "cpp",
            fontSize: 14,
            theme: "vs-dark",
        }
    }

    //when in client 
    const savedLanguage = localStorage.getItem("language");
    const savedTheme = localStorage.getItem("theme");
    const savedFontSize = localStorage.getItem("fontSize");
    return{
        language : savedLanguage || "cpp" ,
        fontSize: savedFontSize ? parseInt(savedFontSize) : 14,
        theme: savedTheme || "vs-dark",
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set ,get) =>{
    const initialState = getInitialState();

    return{     
        ...initialState,
        output: "",
        isRunning: false,
        error:null,
        editor: null,
        executionResult:null,

        getCode : ()=> get().editor?.getValue() || "",


        setEditor : (editor: monaco.editor.IStandaloneCodeEditor) => {
            const savedCode  = localStorage.getItem(`editor-code-${get().language}`);
            if(savedCode){
                editor.setValue(savedCode);
            }
            set({ editor });
        }, 

        setTheme: (theme: string) => {
            set({theme});
            localStorage.setItem("theme", theme);
        },
        setFontSize: (fontSize: number) => {
            set({ fontSize });
            localStorage.setItem("fontSize", fontSize.toString());
        }, 
        setLanguage: (language: string) => {
            const currentCode= get().editor?.getValue();
            if(currentCode){
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }

            localStorage.setItem("language", language);
            set({ 
                language,
                output: "",
                error: null,
            });
        },
        runCode: async () =>{
            const {language , getCode} =get();
            const code = getCode();

            if(!code){
                set({error : "Please enter code to run"});
                return;
            }
            set({isRunning : true , error : null , output : ""});
            
            try {
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
                const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files:[{content : code}]
                    })
                })
                const data = await response.json();
                console.log("Piston data" ,data);
                
                //handle api-error
                if(data.message){
                    set({error : data.message ,executionResult:{
                        code,
                        output : "",
                        error : data.message
                    } });
                    return;
                }

                if(data.compile && data.compile.code !== 0){
                    const error = data.compile.stderr || data.compile.output;
                    set({
                        error,
                        executionResult : {
                            code,
                            output : "",
                            error
                        }
                    })
                    return;
                }
                
                if(data.run && data.run.code !== 0){
                    const error = data.run.stderr || data.run.output;
                    set({
                        error,
                        executionResult : {
                            code,
                            output : "",
                            error 
                        }
                    })
                    return;
                }
                
                const output = data.run ? data.run.output : data.compile.output;
                set({
                    output : output.trim(),
                    error : null,
                    executionResult : {
                        code,
                        output,
                        error : null
                    }
                })

            } catch (error) {
                console.error("Error running code:", error);
                set({
                    error : "Error running code",
                    executionResult : {
                        code,
                        output : "",
                        error : "Error running code"
                    }
                })
            } finally{
                set({isRunning : false});
            }
        }
    }
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;