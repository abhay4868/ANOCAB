"use client"

import { useState, useEffect } from "react"
import { X, FileText, Calendar, User, Package, DollarSign, Plus, Minus, Eye, Edit } from "lucide-react"

function Card({ className, children }) {
  return <div className={`rounded-lg border bg-white shadow-sm ${className || ''}`}>{children}</div>
}

function CardContent({ className, children }) {
  return <div className={`p-0 ${className || ''}`}>{children}</div>
}

function CardHeader({ className, children }) {
  return <div className={`p-6 ${className || ''}`}>{children}</div>
}

function CardTitle({ className, children }) {
  return <h3 className={`text-lg font-semibold ${className || ''}`}>{children}</h3>
}

function Button({ children, onClick, type = "button", variant = "default", size = "default", className = "" }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500"
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 py-1 px-3 text-xs",
    icon: "h-10 w-10"
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

// Preview Component
function QuotationPreview({ data, onEdit }) {
  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  // Calculate CGST and SGST (half of total tax each)
  const cgst = (data.taxAmount / 2).toFixed(2);
  const sgst = (data.taxAmount / 2).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo Placeholder - Replace with your actual logo */}
            <div className="mr-4 flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <span className="text-blue-600 font-bold text-lg">AC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ANOCAB CONDUCTORS</h1>
              <p className="text-xs text-gray-500">QUOTATION</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(data.quotationDate)}</p>
            <p className="text-sm"><span className="font-medium">Quotation #:</span> {data.quotationNumber}</p>
          </div>
        </div>
      </div>

      {/* Company & Bill To */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-semibold mb-1">ANOCAB CONDUCTORS</h2>
            <p className="text-xs text-gray-600">Manufacturer of All Types of Aluminium & Copper Conductors</p>
            <p className="text-xs text-gray-600">GSTIN: 23AACCA0000A1Z5</p>
            <p className="text-xs text-gray-600">Jabalpur, Madhya Pradesh, 482002</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs font-medium text-gray-700 mb-1">Bill To:</p>
            <p className="text-sm font-medium">{data.billTo.business}</p>
            <p className="text-xs text-gray-600">{data.billTo.address}</p>
            <p className="text-xs text-gray-600">GST: {data.billTo.gstNo}</p>
            <p className="text-xs text-gray-600">State: {data.billTo.state}</p>
            <p className="text-xs text-gray-600">Phone: {data.billTo.phone}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (₹)</th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-3 py-2 text-sm text-gray-900">{item.productName}</td>
                <td className="px-3 py-2 text-right text-sm text-gray-500">{item.quantity}</td>
                <td className="px-3 py-2 text-right text-sm text-gray-500">{item.unit}</td>
                <td className="px-3 py-2 text-right text-sm text-gray-900">{parseFloat(item.buyerRate).toFixed(2)}</td>
                <td className="px-3 py-2 text-right text-sm font-medium text-gray-900">
                  {(item.quantity * item.buyerRate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="p-4">
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-700">Subtotal:</span>
              <span className="text-sm text-gray-700">₹{parseFloat(data.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-700">CGST (9%):</span>
              <span className="text-sm text-gray-700">₹{cgst}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-700">SGST (9%):</span>
              <span className="text-sm text-gray-700">₹{sgst}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 mt-1">
              <span className="text-sm font-semibold">Total:</span>
              <span className="text-sm font-semibold">₹{parseFloat(data.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="p-4 border-t">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Terms & Conditions:</h3>
        <div className="text-xs text-gray-600 whitespace-pre-line">
          {data.terms || 'No terms and conditions specified.'}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <p>Thank you for your business!</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-700">Valid Until: {formatDate(data.validUpto)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-4 border-t flex justify-end space-x-3">
        <button
          onClick={onEdit}
          className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Edit Quotation
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

export default function CreateQuotationForm({ customer, onClose, onSave }) {
  const getSevenDaysLater = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const [quotationData, setQuotationData] = useState({
    quotationNumber: `ANQ${Date.now().toString().slice(-6)}`,
    quotationDate: new Date().toISOString().split('T')[0],
    validUpto: getSevenDaysLater(new Date().toISOString().split('T')[0]),
    items: [
      {
        id: 1,
        productName: "",
        quantity: 1,
        unit: "Nos",
        companyRate: 0,
        buyerRate: 0,
        amount: 0
      }
    ],
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    total: 0,
    terms: "1. Payment terms: 30 days from invoice date\n2. Delivery: 15-20 working days\n3. Prices are subject to change without notice\n4. All disputes subject to Jabalpur jurisdiction",
    // Editable bill-to information
    billTo: {
      business: customer?.business || "",
      address: customer?.address || "",
      phone: customer?.phone || "",
      gstNo: customer?.gstNo || "",
      state: customer?.state || ""
    }
  })

  const handleInputChange = (field, value) => {
    const newData = {
      ...quotationData,
      [field]: value
    };

    // If quotationDate changes, update validUpto to be 7 days later
    if (field === 'quotationDate') {
      newData.validUpto = getSevenDaysLater(value);
    }

    setQuotationData(newData);
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...quotationData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    }
    
    // Calculate amount for this item
    if (['quantity', 'companyRate', 'buyerRate'].includes(field)) {
      // Use buyerRate for amount calculation
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].buyerRate;
    }
    
    // Calculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
    const taxAmount = (subtotal * quotationData.taxRate) / 100
    const total = subtotal + taxAmount
    
    setQuotationData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      taxAmount,
      total
    }))
  }

  const addItem = () => {
    setQuotationData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: prev.items.length + 1,
        productName: "",
        quantity: 1,
        unit: "Nos",
        companyRate: 0,
        buyerRate: 0,
        amount: 0
      }]
    }))
  }

  const removeItem = (index) => {
    if (quotationData.items.length > 1) {
      const updatedItems = quotationData.items.filter((_, i) => i !== index)
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
      const taxAmount = (subtotal * quotationData.taxRate) / 100
      const total = subtotal + taxAmount
      
      setQuotationData(prev => ({
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        total
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...quotationData,
      customer: customer,
      createdAt: new Date().toISOString()
    })
    onClose()
  }

  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState({});

  // Update preview data when form data changes
  useEffect(() => {
    setPreviewData(quotationData);
  }, [quotationData]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (showPreview) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
          <QuotationPreview 
            data={previewData} 
            onEdit={togglePreview} 
          />
          <div className="mt-4 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={togglePreview}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit Quotation
            </Button>
            <Button 
              type="button" 
              onClick={() => onSave(previewData)}
              className="bg-green-600 hover:bg-green-700"
            >
              Save Quotation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Create Quotation</CardTitle>
              <p className="text-sm text-gray-600">For {customer?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quotation Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  Quotation Number
                </label>
                <input
                  type="text"
                  value={quotationData.quotationNumber}
                  disabled
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Quotation Date *
                </label>
                <input
                  type="date"
                  required
                  value={quotationData.quotationDate}
                  onChange={(e) => handleInputChange("quotationDate", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Valid Until *
                </label>
                <div className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm">
                  {quotationData.validUpto} (7 days from quotation date)
                </div>
                <input
                  type="hidden"
                  value={quotationData.validUpto}
                  name="validUpto"
                />
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Bill To Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.business}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, business: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.phone}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, phone: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.address}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, address: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">GST Number *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.gstNo}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, gstNo: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.state}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, state: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Items
                </h3>
                <Button type="button" onClick={addItem} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quotationData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="Product name"
                            value={item.productName}
                            onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                            required
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={item.unit}
                            onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="Nos">Nos</option>
                            <option value="Mtr">Mtr</option>
                            <option value="Kg">Kg</option>
                            <option value="Set">Set</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.companyRate}
                              readOnly
                              className="w-24 px-2 py-1 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                              title="Company rate is fixed and cannot be edited"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 10-2 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.buyerRate}
                            onChange={(e) => handleItemChange(index, 'buyerRate', parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                          ₹{item.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          {quotationData.items.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeItem(index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-80 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{quotationData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST ({quotationData.taxRate}%):</span>
                    <span>₹{quotationData.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{quotationData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Terms & Conditions
              </label>
              <textarea
                value={quotationData.terms}
                onChange={(e) => handleInputChange("terms", e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Enter terms and conditions"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={togglePreview}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview Quotation
              </Button>
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={togglePreview}
                >
                  Preview & Save
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
