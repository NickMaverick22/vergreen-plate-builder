
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CustomerNavbar from "@/components/CustomerNavbar";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Health Street, Green City, GC 12345"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-vergreen-600 hover:text-vergreen-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-bold text-vergreen-800">My Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-vergreen-600 hover:text-vergreen-700"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-3xl neumorphic p-6 text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-vergreen-400 to-vergreen-500 rounded-3xl mx-auto flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-vergreen-800">
              {profileData.name}
            </h2>
            <p className="text-vergreen-600">VerGreen Member</p>
          </div>
        </div>

        {/* Profile Information */}
        <Card className="bg-white rounded-3xl neumorphic p-6 space-y-6">
          <h3 className="text-lg font-semibold text-vergreen-800">
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-vergreen-700 font-medium flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500"
                />
              ) : (
                <p className="text-vergreen-800 p-3 bg-vergreen-50 rounded-2xl">
                  {profileData.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-vergreen-700 font-medium flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500"
                />
              ) : (
                <p className="text-vergreen-800 p-3 bg-vergreen-50 rounded-2xl">
                  {profileData.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-vergreen-700 font-medium flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500"
                />
              ) : (
                <p className="text-vergreen-800 p-3 bg-vergreen-50 rounded-2xl">
                  {profileData.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-vergreen-700 font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500"
                />
              ) : (
                <p className="text-vergreen-800 p-3 bg-vergreen-50 rounded-2xl">
                  {profileData.address}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <Button
              onClick={handleSave}
              className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-2xl py-3"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          )}
        </Card>

        {/* Account Actions */}
        <Card className="bg-white rounded-3xl neumorphic p-6 space-y-4">
          <h3 className="text-lg font-semibold text-vergreen-800">
            Account Actions
          </h3>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl py-3 justify-start"
              onClick={() => navigate('/history')}
            >
              Order History
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl py-3 justify-start"
            >
              Change Password
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-red-200 text-red-700 hover:bg-red-50 rounded-2xl py-3 justify-start"
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <CustomerNavbar />
    </div>
  );
};

export default Profile;
