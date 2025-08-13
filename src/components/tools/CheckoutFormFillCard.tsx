"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Edit, CreditCard, Truck } from "lucide-react"

interface CheckoutFormFillCardProps {
  output: {
    success: boolean
    message: string
    formData?: {
      shipping: {
        firstName: string
        lastName: string
        email: string
        address: string
        city: string
        zip: string
      }
      payment: {
        cardNumber: string // Masked version for display
        expiry: string
        cvv: string // Masked version for display
      }
      rawPayment: {
        cardNumber: string // Original for form filling
        expiry: string
        cvv: string
      }
    }
  }
  onFillForm?: (formData: any) => void
}

export function CheckoutFormFillCard({ output, onFillForm }: CheckoutFormFillCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(output.formData)
  const [isFilling, setIsFilling] = useState(false)

  if (!output.success || !output.formData) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-amber-700 font-medium">
          <span className="text-lg">⚠️</span>
          <span>{output.message}</span>
        </div>
      </div>
    )
  }

  const handleFillForm = () => {
    setIsFilling(true)
    
    // Send the form data to the parent component
    if (onFillForm && editedData) {
      onFillForm(editedData)
    }
    
    // Simulate form filling animation
    setTimeout(() => {
      setIsFilling(false)
    }, 1500)
  }

  const handleInputChange = (section: 'shipping' | 'rawPayment', field: string, value: string) => {
    if (!editedData) return
    
    setEditedData({
      ...editedData,
      [section]: {
        ...editedData[section],
        [field]: value
      },
      // Update payment display masks when editing payment info
      ...(section === 'rawPayment' && field === 'cardNumber' && {
        payment: {
          ...editedData.payment,
          cardNumber: value.replace(/\d(?=\d{4})/g, "*")
        }
      }),
      ...(section === 'rawPayment' && field === 'cvv' && {
        payment: {
          ...editedData.payment,
          cvv: value.replace(/./g, "*")
        }
      })
    })
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span>{output.message}</span>
      </div>

      <Card className="border-green-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-900 flex items-center gap-2">
              <span className="text-lg">📋</span>
              Checkout Form Preview
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-green-700 border-green-300 hover:bg-green-50"
            >
              <Edit className="w-4 h-4 mr-1" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Shipping Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
              <Truck className="w-4 h-4" />
              Shipping Information
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-600">First Name</Label>
                {isEditing ? (
                  <Input
                    value={editedData?.shipping.firstName || ''}
                    onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                    className="h-8"
                  />
                ) : (
                  <div className="text-sm font-medium">{editedData?.shipping.firstName}</div>
                )}
              </div>
              <div>
                <Label className="text-xs text-gray-600">Last Name</Label>
                {isEditing ? (
                  <Input
                    value={editedData?.shipping.lastName || ''}
                    onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                    className="h-8"
                  />
                ) : (
                  <div className="text-sm font-medium">{editedData?.shipping.lastName}</div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-600">Email</Label>
              {isEditing ? (
                <Input
                  value={editedData?.shipping.email || ''}
                  onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                  className="h-8"
                />
              ) : (
                <div className="text-sm font-medium">{editedData?.shipping.email}</div>
              )}
            </div>

            <div>
              <Label className="text-xs text-gray-600">Address</Label>
              {isEditing ? (
                <Input
                  value={editedData?.shipping.address || ''}
                  onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                  className="h-8"
                />
              ) : (
                <div className="text-sm font-medium">{editedData?.shipping.address}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-600">City</Label>
                {isEditing ? (
                  <Input
                    value={editedData?.shipping.city || ''}
                    onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                    className="h-8"
                  />
                ) : (
                  <div className="text-sm font-medium">{editedData?.shipping.city}</div>
                )}
              </div>
              <div>
                <Label className="text-xs text-gray-600">ZIP Code</Label>
                {isEditing ? (
                  <Input
                    value={editedData?.shipping.zip || ''}
                    onChange={(e) => handleInputChange('shipping', 'zip', e.target.value)}
                    className="h-8"
                  />
                ) : (
                  <div className="text-sm font-medium">{editedData?.shipping.zip}</div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
              <CreditCard className="w-4 h-4" />
              Payment Information
            </div>

            <div>
              <Label className="text-xs text-gray-600">Card Number</Label>
              {isEditing ? (
                <Input
                  value={editedData?.rawPayment.cardNumber || ''}
                  onChange={(e) => handleInputChange('rawPayment', 'cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="h-8"
                />
              ) : (
                <div className="text-sm font-medium font-mono">{editedData?.payment.cardNumber}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-600">Expiry Date</Label>
                {isEditing ? (
                  <Input
                    value={editedData?.rawPayment.expiry || ''}
                    onChange={(e) => handleInputChange('rawPayment', 'expiry', e.target.value)}
                    placeholder="MM/YY"
                    className="h-8"
                  />
                ) : (
                  <div className="text-sm font-medium">{editedData?.payment.expiry}</div>
                )}
              </div>
              <div>
                <Label className="text-xs text-gray-600">CVV</Label>
                {isEditing ? (
                  <Input
                    value={editedData?.rawPayment.cvv || ''}
                    onChange={(e) => handleInputChange('rawPayment', 'cvv', e.target.value)}
                    placeholder="123"
                    className="h-8"
                  />
                ) : (
                  <div className="text-sm font-medium">{editedData?.payment.cvv}</div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Fill Form Button */}
          <Button
            onClick={handleFillForm}
            disabled={isFilling}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isFilling ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Filling Form...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Fill Checkout Form</span>
              </div>
            )}
          </Button>

          {isFilling && (
            <div className="text-center text-sm text-green-700 animate-pulse">
              📝 Populating checkout form with your information...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}