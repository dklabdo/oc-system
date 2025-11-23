// to do :
// mutation : loginUser , manage token

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import request from "graphql-request";

export const useAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const API_URL = "https://studygo-qg1r.onrender.com/graphql";

  const isAuthenticated = !!token;

  // ---------------------------------
  // LOGIN MUTATION
  // ---------------------------------
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const query = `
        mutation Login($email: String!, $password: String! , $role: String!) {
          loginUser(email: $email, password: $password , role: $role) {
            ... on AuthPayload {
              token
              user {
                fullName
                email
                phoneNumber
                role
                isActive
                
              }
            }
    				... on Error {
              message
            }
          }
        }
      `;

      const role = localStorage.getItem("role");
        console.log(role);
        
      const response = await request(API_URL, query, { email, password , role });
      console.log(response);
      

      if (!response.loginUser.user ) {
        throw new Error(response.loginUser.message);
      }

      return response.loginUser;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log(err);

      toast.error(err.message || "Login failed");
    },
  });

  // ---------------------------------
  // LOGOUT
  // ---------------------------------
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    toast.info("Logged out!");
    navigate("/");
  }, []);

  // ---------------------------------
  // RETURNED VALUES
  // ---------------------------------
  return {
    token,
    isAuthenticated,

    // Login
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,

    // Logout
    logout,
  };
};
