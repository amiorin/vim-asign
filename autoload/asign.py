import os
import vim
import subprocess

class AsignPlugin:
    def __init__(self):
        vim.command("echom 'pid: {0}'".format(os.getpid()))
        vim.command("echom 'cwd: {0}'".format(os.getcwd()))
        vim.command("echom 'path: {0}'".format(os.path.split(vim.eval('fnameescape(globpath(&runtimepath, "autoload/asign.py"))'))[0]))
        dir = os.path.split(vim.eval('fnameescape(globpath(&runtimepath, "autoload/asign.py"))'))[0]
        os.chdir(dir)
        echo = os.path.join(dir, "node", "echo.js")
        self.process = subprocess.Popen("node {0}".format(echo), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    def ExitAndPrintStdout(self):
        self.process.terminate()
        for line in self.process.stdout.readlines():
            vim.command("echom '{0}'".format(line.strip("\n")))
