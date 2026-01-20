// to do : 
// query get academic year : getAcadimicYearByDepartementId do directly after login     


import { gql } from "graphql-request";
import { useGraphQlQuery } from "./useGraphQlQuery";

export const useAcademicYear = (departementId) => {
  const query = gql`
    query GetAcademicYear($departementId: ID!) {
      getAcadimicYearByDepartementId(departementId: $departementId) {
        startYear
        endYear
        isCurrent
        semester
      }
    }
  `;

  const queryResult = useGraphQlQuery(
    ["academic-year", departementId],
    query,
    { departementId },
    {
      enabled: !!departementId,
    }
  );

  return {
    ...queryResult,
    academicYears: queryResult.data?.getAcadimicYearByDepartementId || [],
  };
};
