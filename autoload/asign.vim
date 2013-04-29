function! asign#Init()
    let py_module = fnameescape(globpath(&runtimepath, 'autoload/asign.py'))
    exe 'pyfile ' . py_module
    py asign_plugin = AsignPlugin()
endfunction

function! asign#Restart()
    py asign_plugin.Restart()
endfunction

function! asign#Start()
    py asign_plugin.Start()
endfunction

function! asign#Stop()
    py asign_plugin.Stop()
endfunction
