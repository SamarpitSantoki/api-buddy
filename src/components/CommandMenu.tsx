'use client';
import { ReactNode, useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';

interface ICommandItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface ICommandMenu {
  commands: ICommandItem[];
  handleCommand: (command: string) => void;
}

function CommandMenu({ commands, handleCommand }: ICommandMenu) {
  const [open, setOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState('');

  const handleSelect = (command: string) => {
    handleCommand(command);
    setOpen(false);
    setSelectedCommand('');
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === ' ' && e.ctrlKey) {
        e.preventDefault();
        setOpen((open) => !open);
        setSelectedCommand('');
      }

      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={selectedCommand}
        onValueChange={(value) => {
          setSelectedCommand(value);
        }}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {commands.map((command,index) => (
            <CommandItem
              key={index}
              value={command.id}
              onSelect={handleSelect}
              className="flex gap-2"
            >
              {command.icon}
              <span>{command.label}</span>
            </CommandItem>
          ))}

          {/* <CommandItem>
              <Smile className="w-4 h-4 mr-2" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="w-4 h-4 mr-2" />
              <span>Calculator</span>
            </CommandItem> */}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="More Commands Comming Soon">
          {/* <CommandItem
              onSelect={() => {
                console.log("selected");
              }}
            >
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem> */}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default CommandMenu;
