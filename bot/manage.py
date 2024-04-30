#!/usr/bin/env python
import os
import sys
from pathlib import Path

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
    sys.path.append(str(Path("..").resolve() / "api"))  # add core to path
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
