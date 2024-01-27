import Head from "next/head";
import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function GradeCalculator() {
  const [productSplit, setProductSplit] = useState(0);
  const [processSplit, setProcessSplit] = useState(0);

  const [processAssignments, setProcessAssignments] = useState([]);
  const [totalProcessAssignments, setTotalProcessAssignments] = useState(0);
  const [totalCurrentProcessAssignments, setTotalCurrentProcessAssignments] =
    useState(0);

  const [productAssignments, setProductAssignments] = useState([]);
  const [totalProductAssignments, setTotalProductAssignments] = useState(0);
  const [totalCurrentProductAssignments, setTotalCurrentProductAssignments] =
    useState(0);

  const [percentage, setPercentage] = useState(0);
  const [letterGrade, setLetterGrade] = useState("");

  useEffect(() => {
    setProductSplit(localStorage.getItem("productSplit") || 0);
    setProcessSplit(localStorage.getItem("processSplit") || 0);
    setProcessAssignments(
      JSON.parse(localStorage.getItem("processAssignments")) || []
    );
    setTotalProcessAssignments(
      localStorage.getItem("totalProcessAssignments") || 0
    );
    setTotalCurrentProcessAssignments(
      localStorage.getItem("totalCurrentProcessAssignments") || 0
    );
    setProductAssignments(
      JSON.parse(localStorage.getItem("productAssignments")) || []
    );
    setTotalProductAssignments(
      localStorage.getItem("totalProductAssignments") || 0
    );
    setTotalCurrentProductAssignments(
      localStorage.getItem("totalCurrentProductAssignments") || 0
    );
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("productSplit", productSplit);
    localStorage.setItem("processSplit", processSplit);
    localStorage.setItem(
      "processAssignments",
      JSON.stringify(processAssignments)
    );
    localStorage.setItem("totalProcessAssignments", totalProcessAssignments);
    localStorage.setItem(
      "totalCurrentProcessAssignments",
      totalCurrentProcessAssignments
    );
    localStorage.setItem(
      "productAssignments",
      JSON.stringify(productAssignments)
    );
    localStorage.setItem("totalProductAssignments", totalProductAssignments);
    localStorage.setItem(
      "totalCurrentProductAssignments",
      totalCurrentProductAssignments
    );
  };

  const addProcessAssignment = () => {
    setProcessAssignments((prevAssignments) => [
      ...prevAssignments,
      { id: uuidv4(), current: 0, total: 0 },
    ]);
  };

  const addProductAssignment = () => {
    setProductAssignments((prevAssignments) => [
      ...prevAssignments,
      { id: uuidv4(), current: 0, total: 0 },
    ]);
  };

  const calculateGrade = () => {
    let sumOfTotalProduct = totalProductAssignments;
    let sumOfCurrentProduct = totalCurrentProductAssignments;

    let sumOfTotalProcess = totalProcessAssignments;
    let sumOfCurrentProcess = totalCurrentProcessAssignments;

    let A =
      sumOfTotalProduct * (productSplit / 100) +
      sumOfTotalProcess * (processSplit / 100);

    let B =
      sumOfCurrentProduct * (productSplit / 100) +
      sumOfCurrentProcess * (processSplit / 100);

    let percentage = Math.floor((B / A) * 100);

    if (percentage >= 98) {
      setLetterGrade("A+");
    } else if (percentage >= 92) {
      setLetterGrade("A");
    } else if (percentage >= 90) {
      setLetterGrade("A-");
    } else if (percentage >= 88) {
      setLetterGrade("B+");
    } else if (percentage >= 82) {
      setLetterGrade("B");
    } else if (percentage >= 80) {
      setLetterGrade("B-");
    } else if (percentage >= 79) {
      setLetterGrade("C+");
    } else if (percentage >= 72) {
      setLetterGrade("C");
    } else if (percentage >= 70) {
      setLetterGrade("C-");
    } else if (percentage >= 68) {
      setLetterGrade("D+");
    } else if (percentage >= 62) {
      setLetterGrade("D");
    } else if (percentage >= 60) {
      setLetterGrade("D-");
    } else {
      setLetterGrade("F");
    }

    setPercentage(percentage);
  };

  useEffect(() => {
    calculateGrade();
    console.log(totalProcessAssignments);
    console.log(totalCurrentProcessAssignments);
  }, [
    totalProcessAssignments,
    totalCurrentProcessAssignments,
    totalProductAssignments,
    totalCurrentProductAssignments,
    productSplit,
    processSplit,
  ]);

  const removeProcessAssignment = (id) => {
    const assignmentToRemove = processAssignments.find(
      (assignment) => assignment.id === id
    );
    const newAssignments = processAssignments.filter(
      (assignment) => assignment.id !== id
    );

    setProcessAssignments(newAssignments);

    const newTotal = newAssignments.reduce(
      (total, assignment) => total + Number(assignment.total) || 0,
      0
    );
    setTotalProcessAssignments(newTotal);

    const newCurrentTotal =
      totalCurrentProcessAssignments -
      (Number(assignmentToRemove.current) || 0);
    setTotalCurrentProcessAssignments(newCurrentTotal);
  };

  const removeProductAssignment = (id) => {
    const assignmentToRemove = productAssignments.find(
      (assignment) => assignment.id === id
    );
    const newAssignments = productAssignments.filter(
      (assignment) => assignment.id !== id
    );

    setProductAssignments(newAssignments);

    const newTotal = newAssignments.reduce(
      (total, assignment) => total + Number(assignment.total) || 0,
      0
    );
    setTotalProductAssignments(newTotal);

    const newCurrentTotal =
      totalCurrentProductAssignments -
      (Number(assignmentToRemove.current) || 0);
    setTotalCurrentProductAssignments(newCurrentTotal);
  };

  const resetValues = () => {
    setProductSplit(0);
    setProcessSplit(0);
    setProcessAssignments([]);
    setTotalProcessAssignments(0);
    setTotalCurrentProcessAssignments(0);
    setProductAssignments([]);
    setTotalProductAssignments(0);
    setTotalCurrentProductAssignments(0);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>[BETA] Grade Calculator</title>
        <meta name="description" content="Lightweight Grade Calculator" />
      </Head>

      <GoogleAnalytics gaId="G-6211167L7F" />

      <h1 className="text-2xl mb-4">{percentage}%</h1>
      <h1 className="text-2xl mb-4">{letterGrade}</h1>
      <h1 className="text-2xl mb-4">Grade Calculator</h1>
      {/* product split */}
      <div className="mb-4">
        <button
          onClick={resetValues}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>

        <label
          htmlFor="product"
          className="block text-sm font-medium text-gray-700"
        >
          Product Split
        </label>
        <input
          type="number"
          id="product"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
          value={productSplit}
          onChange={(e) => setProductSplit(e.target.value)}
        />
      </div>
      {/* process split */}
      <div className="mb-4">
        <label
          htmlFor="process"
          className="block text-sm font-medium text-gray-700"
        >
          Process Split
        </label>
        <input
          type="number"
          id="process"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
          value={processSplit}
          onChange={(e) => setProcessSplit(e.target.value)}
        />
      </div>
      {/* process assignments */}
      {processAssignments.map((assignment) => (
        <div key={assignment.id} className="mb-4 p-4 border rounded">
          <label
            htmlFor={`current-${assignment.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Current Process Assignment {assignment.id + 1}
          </label>
          <input
            type="number"
            id={`current-${assignment.id}`}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            defaultValue={assignment.current || 0}
            onBlur={(e) => {
              const newAssignments = [...processAssignments];
              const oldCurrent = processAssignments.find(
                (a) => a.id === assignment.id
              ).current;
              processAssignments.find((a) => a.id === assignment.id).current =
                e.target.value === "" ? 0 : Number(e.target.value);
              setProcessAssignments(newAssignments);
              setTotalCurrentProcessAssignments(
                totalCurrentProcessAssignments -
                  oldCurrent +
                  processAssignments.find((a) => a.id === assignment.id).current
              );
            }}
          />

          <label
            htmlFor={`total-${assignment.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Total Process Assignment {assignment.id + 1}
          </label>
          <input
            type="number"
            id={`total-${assignment.id}`}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            defaultValue={assignment.total || 0}
            onBlur={(e) => {
              const newAssignments = [...processAssignments];
              const oldTotal = processAssignments.find(
                (a) => a.id === assignment.id
              ).total;
              processAssignments.find((a) => a.id === assignment.id).total =
                e.target.value === "" ? 0 : Number(e.target.value);
              setProcessAssignments(newAssignments);
              setTotalProcessAssignments(
                totalProcessAssignments -
                  oldTotal +
                  processAssignments.find((a) => a.id === assignment.id).total
              );
            }}
          />
          <button
            onClick={() => removeProcessAssignment(assignment.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {/* product assignments */}
      <div className="mb-4">
        {/* Add your product assignments input fields here */}
        {productAssignments.map((assignment) => (
          <div key={assignment.id} className="mb-4 p-4 border rounded">
            <label
              htmlFor={`product-current-${assignment.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Current Product Assignment {assignment.id + 1}
            </label>
            <input
              type="number"
              id={`product-current-${assignment.id}`}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
              defaultValue={assignment.current || 0}
              onBlur={(e) => {
                const newAssignments = [...productAssignments];
                const oldCurrent = productAssignments.find(
                  (a) => a.id === assignment.id
                ).current;
                productAssignments.find((a) => a.id === assignment.id).current =
                  e.target.value === "" ? 0 : Number(e.target.value);
                setProductAssignments(newAssignments);
                setTotalCurrentProductAssignments(
                  totalCurrentProductAssignments -
                    oldCurrent +
                    productAssignments.find((a) => a.id === assignment.id)
                      .current
                );
              }}
            />

            <label
              htmlFor={`product-total-${assignment.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Total Product Assignment {assignment.id + 1}
            </label>
            <input
              type="number"
              id={`product-total-${assignment.id}`}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
              defaultValue={assignment.total || 0}
              onBlur={(e) => {
                const newAssignments = [...productAssignments];
                const oldTotal = productAssignments.find(
                  (a) => a.id === assignment.id
                ).total;
                productAssignments.find((a) => a.id === assignment.id).total =
                  e.target.value === "" ? 0 : Number(e.target.value);
                setProductAssignments(newAssignments);
                setTotalProductAssignments(
                  totalProductAssignments -
                    oldTotal +
                    productAssignments.find((a) => a.id === assignment.id).total
                );
              }}
            />
            <button
              onClick={() => removeProductAssignment(assignment.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addProcessAssignment}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Process Assignment
      </button>

      <div className="mb-4">
        {/* Your product assignments input fields go here */}
        <button
          onClick={addProductAssignment}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product Assignment
        </button>
      </div>
      <button
        onClick={saveToLocalStorage}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
}
