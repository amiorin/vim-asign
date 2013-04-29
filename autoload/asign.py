import os
import vim
import subprocess
import socket
import time

class AsignPlugin:
    def __init__(self):
        # FIXME: windowns?
        self.sock = "/tmp/asign.sock"
        self.Start()

    def Restart(self):
        if self.Running():
            self.Stop()
            time.sleep(1)
        self.Start()

    def Start(self):
        if not self.Running():
            dir = os.path.split(vim.eval('fnameescape(globpath(&runtimepath, "autoload/asign.py"))'))[0]
            filename = os.path.join(dir, "node", "asign.js")
            self.process = subprocess.Popen("node {0} {1}".format(filename, self.sock), shell=True)

    def Stop(self):
        if self.Running():
            s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            s.connect(self.sock)
            s.send("stop")
            s.close()
            os.remove(self.sock)

    def Running(self):
        if os.path.exists(self.sock):
            s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            try:
                s.connect(self.sock)
            except:
                os.remove(self.sock)
                return False
            else:
                s.close()
                return True
        else:
            return False
