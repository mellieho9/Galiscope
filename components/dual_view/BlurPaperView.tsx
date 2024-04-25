"use client";
import { Box, Heading, Image } from "@chakra-ui/react";
import paper from "../../public/paper.png"
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function BlurPaperView() {
  return (
    <div className="min-h-screen w-full overflow-y-auto">
        <div style={{ width: "100%", boxShadow: "none" }}>
          <Image
            className="brightness-75 blur-sm bg-cover w-full"
            src={paper.src}
            objectFit="fill"
          />
          <div className="absolute inset-0 flex items-center justify-center w-1/2">
            <Box boxShadow={"md"} bg="white" p={6} borderRadius="xl">
              <CursorArrowRaysIcon
                className="h-6 w-full my-3 mx-1 text-center"
                fill="teal"
              />
              <Heading color="teal" size="sm" className="mb-5 text-center">
                Click here to continue reading the paper
              </Heading>
            </Box>
          </div>
        </div>
    </div>
  );
}
