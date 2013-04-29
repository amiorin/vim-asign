function! asign#Init()
    let py_module = fnameescape(globpath(&runtimepath, 'autoload/asign.py'))
    exe 'pyfile ' . py_module
    py asign_plugin = AsignPlugin()
endfunction

function! asign#ExitAndPrintStdout()
    py asign_plugin.ExitAndPrintStdout()
endfunction
