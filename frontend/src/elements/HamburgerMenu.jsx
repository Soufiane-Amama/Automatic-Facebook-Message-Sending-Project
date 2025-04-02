'use client';
import dynamic from 'next/dynamic';
import { IconButton } from "@chakra-ui/react";

const HamburgerIcon = dynamic(() => import('@chakra-ui/icons').then(mod => mod.HamburgerIcon), { ssr: false });

const HamburgerMenu = ({ onOpen }) => (
  <IconButton
    bg="brand.400"
    aria-label="Open menu"
    icon={<HamburgerIcon />}
    display={{ md2: "none" }} // يظهر فقط على الشاشات الصغيرة
    onClick={onOpen}
  />
);

export default HamburgerMenu;
