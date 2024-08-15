import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

export const registerLending = async (lending) => {
    const { data, error } = await supabase
    .from("Checkouts")
    .insert(lending)
    .select()

    if (error) {
        console.error('error creating patron', error)
        return false;
    }
    if (data) {
        console.log('patron created', data)
        return true;
    }
};